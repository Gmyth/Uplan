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
    print "正在抓取第"+str(i)+'页'
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


    Course_url_1 = selector.xpath('/html/body/table[4]/tr/td[2]//a/@href')
    for each in Course_url_1[0:len(Course_url_1)]:
        html2=session.get(each,headers=head).content
        selector2=etree.HTML(html2)

        Course_Description_1=re.findall('<td colspan="8" >(.*?)</td>',html2,re.S)
        if Course_Description_1==[]:
            Course_Description.append(" ")
        else:
            for each in Course_Description_1:
                Course_Description.append(each)


        k0=[]
        On_line_Resources_1=selector.xpath('//tr[34]//td//ul[@style="list-style-type:circle;"]//li')
        for each in On_line_Resources_1:
            k1=each.xpath('string(.)').strip().replace('         ','').replace('\t','')
            print k1
            k0.append(k1)

        k2='    '.join(k0)
        On_line_Resources.append(k2)



        k0=[]
        Other_Courses_Taught_By_1=selector.xpath('//tr[40]//td//ul[@style="list-style-type:circle;"]//li')
        for each in Other_Courses_Taught_By_1:
            k1=each.xpath('string(.)').strip().replace('         ','').replace('\t','')
            print k1
            k0.append(k1)

        k2='    '.join(k0)
        Other_Courses_Taught_By.append(k2)




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
        len(Days),len(Time),len(Room),len(Location),len(instructors),len(status),\
        len(Course_Description),len(On_line_Resources),len(Other_Courses_Taught_By)



df=pd.DataFrame({"Class":Class,"Course":Course,"Title":Title,"Section":Section,"Type":Type,\
                 "Days":Days,"Time":Time,"Room":Room,"Location":Location,"instructors":instructors,"status":status,"Course_Description":Course_Description,\
                 "On_line_Resources":On_line_Resources,"Other_Courses_Taught By":Other_Courses_Taught_By
                 })


print df
##########################写入mongodb 数据库######################


from pymongo import MongoClient
con=MongoClient()
db = con.Class
post=db.Classdata


##插入数据
for i in range(0,len(df)):
    u=dict(Class =df.iloc[i,0], Course =df.iloc[i,1],Title=df.iloc[i,10],Section=df.iloc[i,8],Type=df.iloc[i,11], \
           Days=df.iloc[i,3],Time=df.iloc[i,9],Room=df.iloc[i,7],Location=df.iloc[i,4],instructors=df.iloc[i,12],status=df.iloc[i,13],\
           Course_Description=df.iloc[i,2],On_line_Resources=df.iloc[i,5],Other_Courses_Taught_By=df.iloc[i,6]
           )
    print u
    post.insert(u)


time2 = time.time()
print u'Done！'
print ('Total time：' + str(time2 - time1) + 's')