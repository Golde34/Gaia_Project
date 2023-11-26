/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.utils;

/**
 *
 * @author tungd
 */
public class Course {
    private int courseId;
    private String className;
    private String subjectName;
    private int subjectId;
    private int slotId;
    private String room;

    public Course(int courseId, String className, String subjectName, int subjectId, int slotId, String room) {
        this.courseId = courseId;
        this.className = className;
        this.subjectName = subjectName;
        this.subjectId = subjectId;
        this.slotId = slotId;
        this.room = room;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public int getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(int subjectId) {
        this.subjectId = subjectId;
    }

    public int getSlotId() {
        return slotId;
    }

    public void setSlotId(int slotId) {
        this.slotId = slotId;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    
}
