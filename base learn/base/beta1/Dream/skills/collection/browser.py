import re
import subprocess
import time
import urllib.request
import webbrowser

import requests
import wikipedia

from Dream.skills.skill import AssistantSkill
from bs4 import BeautifulSoup as bs

class BrowserSkills(AssistantSkill):

    @classmethod
    def tell_me_about(cls, voice_transcript, skill):
        tags = cls.extract_tags(voice_transcript, skill['tags'])
        only_text_pattern = '([a-zA-Z]+)'
        for tag in tags:
            regex = re.search(tag + ' ' + only_text_pattern, voice_transcript)
            if regex:
                topic = regex.group(1)
                try:
                    response = cls._decode_wiki_response(topic)
                    cls.response(response)
                except Exception as e:
                    cls.console(error_log="Error with the execution of skill with message{0}".format(e))
                    cls.response("I can't find what you want, and I will open a new tab in browser")
                    time.sleep(1)
                    cls._search_on_google(topic)

    @classmethod
    def open_website_in_browser(cls, voice_transcript, skill):
        tags = cls.extract_tags(voice_transcript, skill['tags'])
        domain_regex = '([\.a-zA-Z]+)'

        for tag in tags:
            regex = re.search(tag + ' ' + domain_regex, voice_transcript)
            try:
                if regex:
                    domain = regex.group(1)
                    url = cls._create_url(domain)
                    cls.response('Sure')
                    time.sleep(1)
                    webbrowser.open_new_tab(url)
                    cls.response('I opened the {0}'.format(domain))
            except Exception as e:
                cls.console(error_log="Error with the execution of skill with message {0}".format(e))
                cls.response("I can't find this domain..")

    @classmethod
    def open_in_youtube(cls, voice_transcript, skill):
        tags = cls.extract_tags(voice_transcript, skill['tags'])
        for tag in tags:
            regex = re.search(tag + ' (.*)', voice_transcript)
            try:
                if regex:
                    search_text = regex.group(1)
                    base = "https://www.youtube.com/results?search_query={0}&orderby=viewCount"
                    r = requests.get(base.format(search_text.replace(' ', '+')))
                    page = r.text
                    soup = bs(page, 'html.parser')
                    videos = soup.findAll('a', attrs={'class': 'yt-uix-tile-link'})
                    video = "https://www.youtube.com" + videos[0]['href'] + "&autoplay=1"
                    cls.console(info_log='Play Youtube video: {0}'.format(video))
                    subprocess.Popen(["python", "-m", "webbrowser", "-t", video], stdout=subprocess.PIPE, shell=False)
            except Exception as e:
                cls.console(error_log='Error with the execution of skill with message {0}'.format(e))
                cls.response("I can't find what do you want in Youtube.")

    @classmethod
    def tell_me_today_news(cls, **kwargs):
        try:
            news_url = "https://news.google.com/news/rss"
            client = urllib.request.urlopen(news_url)
            xml_page = client.read()
            client.close()
            soup = bs(xml_page, "xml")
            news_list = soup.findAll("item")
            response = ""
            for news in news_list[:5]:
                data = news.title.text.encode('utf-8') + '\n'
                response += data.decode()
            cls.response(response)
        except Exception as e:
            cls.console(error_log='Error with the execution of skill with message {0}'.format(e))
            cls.response("I can't find any daily news..")

    @classmethod
    def _decode_wiki_response(cls, topic):
        news = wikipedia.page(topic)
        data = news.content[:500].encode('utf-8')
        response = ''
        response += data.decode()
        return response

    @classmethod
    def _search_on_google(cls, topic):
        url = "https://www.google.com.tr/search?q={}".format(topic)
        try:
            webbrowser.open_new_tab(url)
        except Exception as e:
            cls.console(error_log="Error with the execution of skill with message {0}".format(e))
            cls.response("Sorry I faced an issue with google search")

    @classmethod
    def _create_url(cls, domain):
        top_level_domains = ['.com', '.org', '.net', '.int', '.edu', '.gov', '.mil']
        url = None
        for top_level_domain in top_level_domains:
            if re.search(top_level_domain, domain):
                url = "http://" + domain

        url = "http://www." + domain + '.com' if not url else url
        return url