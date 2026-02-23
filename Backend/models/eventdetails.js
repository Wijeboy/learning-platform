const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: ['Workshop', 'Seminar', 'Conference', 'Webinar', 'Training', 'Meetup'],
    default: 'Workshop'
  },
  instructor: {
    name: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://i.pravatar.cc/40?img=12'
    },
    bio: {
      type: String,
      trim: true
    }
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  duration: {
    type: Number,
    required: [true, 'Event duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  location: {
    name: {
      type: String,
      required: [true, 'Location name is required']
    },
    address: {
      type: String,
      required: [true, 'Location address is required']
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    mapUrl: {
      type: String
    }
  },
  image: {
    type: String,
    required: [true, 'Event image is required'],
    default: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
  },
  stats: {
    studentsEnrolled: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    capacity: {
      type: Number,
      required: [true, 'Event capacity is required'],
      min: 1
    }
  },
  price: {
    type: Number,
    required: [true, 'Event price is required'],
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  tags: [{
    type: String,
    trim: true
  }],
  registrations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted student count
eventSchema.virtual('formattedStudentCount').get(function() {
  const count = this.stats.studentsEnrolled;
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`;
  }
  return count.toString();
});

// Virtual to check if event is full
eventSchema.virtual('isFull').get(function() {
  return this.stats.studentsEnrolled >= this.stats.capacity;
});

// Virtual to check if event is past
eventSchema.virtual('isPast').get(function() {
  return new Date() > this.date;
});

// Index for better query performance
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ 'instructor.name': 1 });

// Middleware to update status based on date
eventSchema.pre('save', function(next) {
  const now = new Date();
  const eventDate = new Date(this.date);
  const eventEndDate = new Date(eventDate.getTime() + this.duration * 60000);

  if (now < eventDate) {
    this.status = 'upcoming';
  } else if (now >= eventDate && now < eventEndDate) {
    this.status = 'ongoing';
  } else if (now >= eventEndDate) {
    this.status = 'completed';
  }

  next();
});

// Static method to get upcoming events
eventSchema.statics.getUpcomingEvents = function() {
  return this.find({
    date: { $gte: new Date() },
    status: { $in: ['upcoming', 'ongoing'] },
    isActive: true
  }).sort({ date: 1 });
};

// Static method to get popular events
eventSchema.statics.getPopularEvents = function(limit = 10) {
  return this.find({
    date: { $gte: new Date() },
    isActive: true
  })
  .sort({ 'stats.studentsEnrolled': -1, 'stats.rating': -1 })
  .limit(limit);
};

// Instance method to register a user
eventSchema.methods.registerUser = async function(userId) {
  if (this.isFull) {
    throw new Error('Event is full');
  }
  
  if (this.registrations.includes(userId)) {
    throw new Error('User already registered for this event');
  }

  this.registrations.push(userId);
  this.stats.studentsEnrolled += 1;
  await this.save();
  
  return this;
};

// Instance method to unregister a user
eventSchema.methods.unregisterUser = async function(userId) {
  const index = this.registrations.indexOf(userId);
  
  if (index === -1) {
    throw new Error('User is not registered for this event');
  }

  this.registrations.splice(index, 1);
  this.stats.studentsEnrolled = Math.max(0, this.stats.studentsEnrolled - 1);
  await this.save();
  
  return this;
};

// Instance method to add rating
eventSchema.methods.addRating = async function(rating) {
  if (rating < 0 || rating > 5) {
    throw new Error('Rating must be between 0 and 5');
  }

  const totalRatings = this.stats.totalRatings;
  const currentRating = this.stats.rating;
  
  // Calculate new average rating
  const newRating = ((currentRating * totalRatings) + rating) / (totalRatings + 1);
  
  this.stats.rating = Math.round(newRating * 10) / 10; // Round to 1 decimal
  this.stats.totalRatings += 1;
  
  await this.save();
  return this;
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;