from datetime import datetime, date
from Dream.skills.skill import AssistantSkill


hour_mapping = {
    '0': 'twelve',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '10': 'ten',
    '11': 'eleven',
    '12': 'twelve'
}

class DateTimeSkill(AssistantSkill):

    @classmethod
    def tell_the_time(cls, **kwargs):
        now = datetime.now()
        hour, minute = now.hour, now.minute
        converted_time = cls._time_in_text(hour, minute)
        cls.response('The current time is: {0}'.format(converted_time))

    @classmethod
    def tell_the_date(cls, **kwargs):
        today = date.today()
        cls.response('The current date is: {0}'.format(today))

    @classmethod
    def _time_in_text(cls, hour, minute):
        if minute == 0:
            time = cls._create_hour_period(hour) + " o'clock"
        elif minute == 15:
            time = "quarter past " + cls._create_hour_period(hour)
        elif minute == 30:
            time = "half past " + cls._create_hour_period(hour)
        elif minute == 45:
            hour_12h_format = cls._convert_12_hour_format(hour + 1)
            period = cls._get_12_hour_period(hour)
            time = "quarter to " + hour_mapping[str(hour_12h_format)] + ' ' + '(' + period + ')'
        elif 0 < minute < 30:
            time = str(minute) + " minutes past " + cls._create_hour_period(hour)
        else:
            hour_12h_format = cls._convert_12_hour_format(hour + 1)
            period = cls._get_12_hour_period(hour)
            time = str(60 - minute) + " minutes to " + hour_mapping[str(hour_12h_format)] + ' ' + '(' + period + ')'

        return time

    @classmethod
    def _create_hour_period(cls, hour):
        hour_format = cls._convert_12_hour_format(hour)
        period = cls._get_12_hour_period(hour)
        return hour_mapping[str(hour_format)] + ' ' + '(' + period + ')'

    @classmethod
    def _get_12_hour_period(cls, hour):
        return 'pm' if 12 <= hour < 24 else 'am'

    @classmethod
    def _convert_12_hour_format(cls, hour):
        return hour - 12 if 12 < hour <= 24 else hour