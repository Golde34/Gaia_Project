import subprocess

from Dream.skills.skill import AssistantSkill
from Dream.settings import ROOT_LOG_CONF
import Dream


def get_master_volume():
    stdout, stderr = subprocess.Popen('/usr/bin/amixer sget Master', shell=True,
                                      stdout=subprocess.PIPE).communicate()
    list_len = len(str(stdout).split('\n'))
    amixer_stdout = str(stdout).split('\n')[list_len - 1]

    find_start = amixer_stdout.find('[') + 1
    find_end = amixer_stdout.find('%]', find_start)

    return float(amixer_stdout[find_start:find_end])


def set_master_volume(volume):
    val = float(int(volume))

    proc = subprocess.Popen('/usr/bin/amixer sset Master ' + str(val) + '%', shell=True, stdout=subprocess.PIPE)
    proc.wait()


class UtilSkills(AssistantSkill):

    @classmethod
    def speech_interruption(cls, **kwargs):
        Dream.output_engine.stop_speaking = True

    @classmethod
    def clear_console(cls, **kwargs):
        log_path = ROOT_LOG_CONF['handlers']['file']['filename']
        myfile = open(log_path, "w")
        myfile.write('')
        myfile.close()

        cls.console("Sure")

    @classmethod
    def increase_master_volume(cls, **kwargs):
        step = 2
        volume = get_master_volume()
        if volume > 31:
            cls.response("The speakers volume is already max")

        increased_volume = volume + step
        if increased_volume > 31:
            set_master_volume(31)
        else:
            set_master_volume(increased_volume)
            cls.response("I increased the speakers volume")

    @classmethod
    def reduce_master_volume(cls, **kwargs):
        step = 2
        volume = get_master_volume()
        if volume < 0:
            cls.response("The speakers volume is already muted")

        reduced_volume = volume - step
        if reduced_volume < 0:
            set_master_volume(0)
        else:
            set_master_volume(reduced_volume)
            cls.response("I reduced the speakers volume")

    @classmethod
    def mute_master_volume(cls, **kwargs):
        volume = get_master_volume()
        if volume == 0:
            cls.response("The speakers volume is already muted")
        else:
            set_master_volume(0)
            cls.response("I mute the master speakers")

    @classmethod
    def max_master_volume(cls, **kwargs):
        volume = get_master_volume()
        if volume == 31:
            cls.response("The speakers volume is already max")
        else:
            set_master_volume(31)
            cls.response("I set max the master speakers")