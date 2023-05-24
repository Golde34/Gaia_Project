import speedtest
import logging

from Dream.skills.skill import AssistantSkill
from Dream.utils.internet import internet_connectivity_check


class InternetSkills(AssistantSkill):

    @classmethod
    def run_speedtest(cls, **kwargs):
        try:
            cls.response('Sure! Wait a second to measure')
            st = speedtest.Speedtest()
            server_name = []
            st.get_servers(server_name)

            downlink_bps = st.download()
            uplink_bps = st.upload()
            ping = st.results.ping
            up_mbps = uplink_bps / 1000000
            down_mbps = downlink_bps / 1000000

            cls.response("Speedtest results:\n"
                         "The ping is: %s ms \n"
                         "The uplink is: %0.2f Mbps \n"
                         "The downlink is: %0.2f Mbps" % (ping, up_mbps, down_mbps)
                         )

        except Exception as e:
            cls.response("I couldn't run a speedtest")
            logging.error("Speedtest error with message: {0}".format(e))

    @classmethod
    def internet_availability(cls, **kwargs):
        if internet_connectivity_check():
            cls.response("The internet connection is ok")
            return True
        else:
            cls.response("The internet is down for now")
            return False