module.exports =  {

    getFrequencyMessage() {
        return {
            'text': 'Lets schedule a facilitator!',
            'attachments': [
                {
                    'text': 'How frequent do you want to me to choose someone?',
                    'fallback': 'You are unable to schedule a facilitator',
                    'callback_id': 'randy_scheduler',
                    'color': '#3AA3E3',
                    'attachment_type': 'default',
                    'actions': [
                        {
                            'name': 'frequncy',
                            'text': '1 minute',
                            'type': 'button',
                            'value': 'one-minute'
                        },
                        {
                            'name': 'frequncy',
                            'text': 'Daily',
                            'type': 'button',
                            'value': 'daily'
                        },
                        {
                            'name': 'frequncy',
                            'text': 'Weekly',
                            'type': 'button',
                            'value': 'weekly'
                        },
                                        {
                            'name': 'frequncy',
                            'text': 'Cancel',
                            'type': 'button',
                            'value': 'cancel',
                            'style': 'danger'
                        }
                    ]
                }
            ]
        };
    },

    getDailyResponse() {
        return {
            'text': 'Lets get some frequency details',
            'attachments': [
                {
                    'text': 'What time should I select a facilitator?',
                    'fallback': 'You are unable to schedule a facilitator',
                    'callback_id': 'randy_scheduler',
                    'color': '#3AA3E3',
                    'attachment_type': 'default',
                    'actions': [
                        {
                            "name": "hour_list",
                            "text": "Pick an hour...",
                            "type": "select",
                            "options": [
                                {
                                    "text": "12",
                                    "value": "12"
                                },
                                {
                                    "text": "1",
                                    "value": "1"
                                },
                                {
                                    "text": "2",
                                    "value": "2"
                                },
                                {
                                    "text": "3",
                                    "value": "3"
                                },
                                {
                                    "text": "4",
                                    "value": "4"
                                },
                                {
                                    "text": "5",
                                    "value": "5"
                                },
                                {
                                    "text": "6",
                                    "value": "6"
                                },
                                {
                                    "text": "7",
                                    "value": "7"
                                },
                                {
                                    "text": "8",
                                    "value": "8"
                                },
                                {
                                    "text": "9",
                                    "value": "9"
                                },
                                {
                                    "text": "10",
                                    "value": "10"
                                },
                                {
                                    "text": "11",
                                    "value": "11"
                                },
                            ]
                        },
                        {
                            "name": "minute_list",
                            "text": "Pick a minute...",
                            "type": "select",
                            "options": [
                                {
                                    "text": "00",
                                    "value": "00"
                                },
                                {
                                    "text": "15",
                                    "value": "15"
                                },
                                {
                                    "text": "30",
                                    "value": "30"
                                },
                                {
                                    "text": "45",
                                    "value": "45"
                                }
                            ]
                        },
                        {
                            "name": "am_pm_list",
                            "text": "Night or day...",
                            "type": "select",
                            "options": [
                                {
                                    "text": "AM",
                                    "value": "am"
                                },
                                {
                                    "text": "PM",
                                    "value": "pm"
                                }
                            ]
                        },
                        {
                            "name": "daily_type_list",
                            "text": "Everyday or just the work week...",
                            "type": "select",
                            "options": [
                                {
                                    "text": "Daily",
                                    "value": "daily"
                                },
                                {
                                    "text": "Work week",
                                    "value": "work_week"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}