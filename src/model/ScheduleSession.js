const mongoose = require('mongoose');

const ScheduleSession = new mongoose.Schema({
    alert_time: Number,
    channel_id: String,
});

mongoose.model('ScheduleSession', ScheduleSession);