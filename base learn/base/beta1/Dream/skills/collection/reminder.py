import datetime
import os.path
import re
import threading
import time

from playsound import playsound
from apscheduler.schedulers.background import BackgroundScheduler

from Dream.utils.input import digits_input_validation
from Dream.skills.skill import AssistantSkill
from Dream.utils.console_log import OutputStyler


time_intervals = {
    'seconds': {'variations': ['sec', 'second', 'seconds'],
                'scheduler_interval': 'seconds'
                },
    'minutes': {'variations': ['minute', 'minutes'],
                'scheduler_interval': 'minutes'
                },
    'hours': {'variations': ['hour', 'hours'],
              'scheduler_interval': 'hours'
              },
    'months': {'variations': ['month', 'months'],
               'scheduler_interval': 'months'
               },
    'years': {'variations': ['year', 'years'],
              'scheduler_interval': 'years'
              },
}


class ReminderSkills(AssistantSkill):

    @classmethod
    def create_reminder(cls, voice_transcript, **kwargs):
        reminder_duration, scheduler_interval = cls._get_reminder_duration_and_time_interval(voice_transcript)

        def reminder():
            cls.response("hey, I remind you that now the {0} {1} passed!".format(reminder_duration, scheduler_interval))
            job.remove()

        try:
            if reminder_duration:
                scheduler = BackgroundScheduler()
                interval = {scheduler_interval: int(reminder_duration)}
                job = scheduler.add_job(reminder, 'interval', **interval)
                cls.response("I have created a reminder in {0} {1}".format(reminder_duration, scheduler_interval))
                scheduler.start()
        except Exception as e:
            cls.console(error_log=e)
            cls.response("I can't create a reminder")

    @classmethod
    def set_alarm(cls, voice_transcript, **kwargs):
        cls.response("Yes, I will set an alarm")
        alarm_hour = digits_input_validation(message="Tell me the exact hour", values_range=[0, 24])
        alarm_minute = digits_input_validation(message="Tell me the minutes", values_range=[0, 59])

        try:
            thread = threading.Thread(target=cls._alarm_countdown, args=(alarm_hour, alarm_minute))
            thread.start()
        except Exception as e:
            cls.console(error_log="Failed to play alarm with error message: {0}".format(e))

    @classmethod
    def _get_reminder_duration_and_time_interval(cls, voice_transcript):
        for time_interval in time_intervals.values():
            for variation in time_interval['variations']:
                if variation in voice_transcript:
                    regex = re.search('([0-9])', voice_transcript)
                    duration = regex.group(1)
                    return duration, time_interval['scheduler_interval']

    @classmethod
    def _alarm_countdown(cls, alarm_hour, alarm_minutes):

        now = datetime.datetime.now()
        alarm_time = datetime.datetime.combine(now.date(), datetime.time(alarm_hour, alarm_minutes, 0))
        waiting_period = alarm_time - now

        if waiting_period < datetime.timedelta(0):
            cls.response("This time has past for today")
        else:
            response_message = "Alarm - {0}:{1} for today is configured " \
                               + OutputStyler.GREEN + "successfully!" + OutputStyler.ENDC
            cls.response(response_message.format(alarm_hour, alarm_minutes))

            time.sleep((alarm_time - now).total_seconds())
            cls.response("Wake up! It's {0}".format(datetime.datetime.now().strftime('%H:%M')))

            skills_dir = os.path.dirname(__file__)
            alarm_soundfile = os.path.join(skills_dir, '..', 'files', 'analog_watch_alarm.wav')

            playsound(alarm_soundfile)