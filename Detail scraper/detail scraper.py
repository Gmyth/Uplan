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
##########################第二层爬虫
Class = []
Course = []
Course_url=[]
Title = []
Section = []
Type = []
Days = []
Time = []
Room = []
Location = []
instructors = []
status = []
Course_Description=[]
On_line_Resources=[]
Other_Courses_Taught_By=[]

#################################################解析每个字段##########################
for i in range(0,len(url_list)):
    print "Collecting the "+str(i)+'th page'
    # time.sleep(3)
    html2=session.get(url_list[i],headers=head).content
    selector=etree.HTML(html2)
    Class_1 = selector.xpath('/html/body/table[4]/tr/td[1]')

    for each in Class_1[3:len(Class_1)]:
        print each.xpath('string(.)').strip().replace('\t', '')
        Class.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Class" in Class:
            Class.remove("Class")

    print len(Class)
    Course_1 = selector.xpath('/html/body/table[4]/tr/td[2]')
    for each in Course_1[1:len(Course_1)]:
        print each.xpath('string(.)').strip().replace('\t','')
        Course.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Course" in Course:
            Course.remove("Course")
    print len(Course)