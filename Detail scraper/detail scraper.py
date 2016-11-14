# -*- coding:utf-8*-
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
import time
import requests
from lxml import etree
import pandas as pd
import re
time1=time.time()
import bs4



url="http://www.buffalo.edu/class-schedule?semester=spring"
head={'User-Agent':'Mozilla/5.0 (Linux; U; Android 4.1.2; zh-tw; GT-I9300 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'}
session=requests.session()
html=session.get(url,headers=head).content
selector=etree.HTML(html)
#############################第一层爬虫
url_list=[]
course_url=re.findall('<td class="padding">&nbsp;&nbsp;(.*?)</a>',html,re.S)
for each in course_url:
    kk=re.findall('<a href="(.*?)">',each,re.S)[0]
    # print kk
    url_list.append(kk)

print len(url_list)