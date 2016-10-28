# -*- coding:utf-8*-
# use etree in lxml(http://lxml.de/) and bs4(https://www.crummy.com/software/BeautifulSoup/) to analyse html and get course information.
# use pandas(http://pandas.pydata.org/) to make the Dataframe.
# use pymongo to put Data into Mongodb.
import sys
import time
import requests
from lxml import etree
import pandas as pd
import re
import bs4
from pymongo import MongoClient
reload(sys)
sys.setdefaultencoding('utf-8')
time1=time.time()





url="http://www.buffalo.edu/class-schedule?semester=fall"
head={'User-Agent':'Mozilla/5.0 (Linux; U; Android 4.1.2; zh-tw; GT-I9300 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'}
session=requests.session()
html=session.get(url,headers=head).content
selector=etree.HTML(html)
#############################
url_list=[]
course_url=re.findall('<td class="padding">&nbsp;&nbsp;(.*?)</a>',html,re.S)
for each in course_url:
    kk=re.findall('<a href="(.*?)">',each,re.S)[0]
    # print kk
    url_list.append(kk)

print len(url_list)

##########################
Class = []
Course = []
Title = []
Section = []
Type = []
Days = []
Time = []
Room = []
Location = []
instructors = []
status = []


#################################################analyse each line##########################
for i in range(0,len(url_list)):
    print "scraping "+str(i)+'th page'
    # time.sleep(3)
    html2=session.get(url_list[i],headers=head).content
    selector=etree.HTML(html2)

    Class_1 = selector.xpath('/html/body/table[4]/tr/td[1]')
    for each in Class_1[3:len(Class_1)]:
        # print each.xpath('string(.)').strip().replace('\t', '')
        Class.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Class" in Class:
            Class.remove("Class")

    print len(Class)


    Course_1 = selector.xpath('/html/body/table[4]/tr/td[2]')
    for each in Course_1[1:len(Course_1)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        Course.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Course" in Course:
            Course.remove("Course")
    print len(Course)


    Title_1 = selector.xpath('/html/body/table[4]/tr/td[3]')
    for each in Title_1[1:len(Title_1)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        Title.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Title" in Title:
            Title.remove("Title")
    print len(Title)


    Section_1 = selector.xpath('/html/body/table[4]/tr/td[4]')
    for each in Section_1[1:len(Section_1)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        Section.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Section" in Section:
            Section.remove("Section")
    print len(Section)


    Type_1 = selector.xpath('/html/body/table[4]/tr/td[5]')
    for each in Type_1[1:len(Type_1)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        Type.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Type" in Type:
            Type.remove("Type")
    print len(Type)


    Days_1 = selector.xpath('/html/body/table[4]/tr/td[6]')
    for each in Days_1[1:len(Days_1)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        Days.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Days" in Days:
            Days.remove("Days")
    print len(Days)


    Time_1 = selector.xpath('/html/body/table[4]/tr/td[7]')
    for each in Time_1[1:len(Time_1)]:
        # print each.xpath('string(.)').strip().replace('\t','').replace('                          ','')
        Time.append(each.xpath('string(.)').strip().replace('\t', '').replace('                          ', ''))
        if "Time" in Time:
            Time.remove("Time")

    print len(Time)


    Room_1 = selector.xpath('/html/body/table[4]/tr/td[8]')
    for each in Room_1[1:len(Room_1)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        Room.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Room" in Room:
            Room.remove("Room")

    print len(Room)


    Location_1 = selector.xpath('/html/body/table[4]/tr/td[9]')
    for each in Location_1[1:len(Location_1)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        Location.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Location" in Location:
            Location.remove("Location")

    print len(Location)


    instructors_1 = selector.xpath('/html/body/table[4]/tr/td[10]')
    for each in instructors_1[1:len(instructors_1)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        instructors.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Instructor (*) additional instructors" in instructors:
            instructors.remove("Instructor (*) additional instructors")
    print len(instructors)


    soup = bs4.BeautifulSoup(html, "lxml")
    kk = selector.xpath('/html/body/table[4]/tr/td[11]')
    for each in kk[1:len(kk)]:
        # print each.xpath('string(.)').strip().replace('\t','')
        status.append(each.xpath('string(.)').strip().replace('\t', ''))
        if "Status" in status:
            status.remove("Status")

    print len(status)

print len(Class),len(Course),len(Title),len(Section),len(Type),\
        len(Days),len(Time),len(Room),len(Location),len(instructors),len(status)


df=pd.DataFrame({"Class":Class,"Course":Course,"Title":Title,"Section":Section,"Type":Type,\
                 "Days":Days,"Time":Time,"Room":Room,"Location":Location,"instructors":instructors,"status":status
                 })


print df
# ##########################put it into mongodb by pymongo libirary######################
con=MongoClient()
db = con.Class
post=db.Classdata


##insert data
for i in range(0,len(df)):
    u=dict(Class =df.iloc[i,0], Course =df.iloc[i,1],Title=df.iloc[i,7],Section=df.iloc[i,5],Type=df.iloc[i,8], \
           Days=df.iloc[i,2],Time=df.iloc[i,6],Room=df.iloc[i,4],Location=df.iloc[i,3],instructors=df.iloc[i,9],status=df.iloc[i,10])
    print u
    post.insert(u)


time2 = time.time()
print u'Scraping Done！'
print ('Total Running Time：' + str(time2 - time1) + 's')