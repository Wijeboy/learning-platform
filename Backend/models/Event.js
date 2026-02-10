const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true
  },
  eventFee: {
    type: Number,
    required: [true, 'Please provide event fee'],
    min: [0, 'Event fee cannot be negative']
  },
  location: {
    type: String,
    required: [true, 'Please provide event location'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design']
  },
  eventDescription: {
    type: String,
    required: [true, 'Please provide event description']
  },
  resourcePerson: {
    type: String,
    required: [true, 'Please provide resource person name'],
    trim: true
  },
  eventDate: {
    type: Date,
    required: [true, 'Please provide event date']
  },
  startTime: {
    type: String,
    required: [true, 'Please provide start time']
  },
  allocatedSeats: {
    type: Number,
    required: [true, 'Please provide allocated seats'],
    min: [1, 'Allocated seats must be at least 1']
  },
  image: {
    type: String,
    required: [true, 'Please upload event image']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;