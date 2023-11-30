/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.utils;

/**
 *
 * @author tungd
 */
public class Instructor {
    private int id;
    private String name;
    private double salaryLevel;
    private int minClass;
    private int maxClass;
    private int idealClass;

    public Instructor(int id, String name, double salaryLevel, int minClass, int maxClass, int idealClass) {
        this.id = id;
        this.name = name;
        this.salaryLevel = salaryLevel;
        this.minClass = minClass;
        this.maxClass = maxClass;
        this.idealClass = idealClass;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalaryLevel() {
        return salaryLevel;
    }

    public void setSalaryLevel(double salaryLevel) {
        this.salaryLevel = salaryLevel;
    }

    public int getMinClass() {
        return minClass;
    }

    public void setMinClass(int minClass) {
        this.minClass = minClass;
    }

    public int getMaxClass() {
        return maxClass;
    }

    public void setMaxClass(int maxClass) {
        this.maxClass = maxClass;
    }

    public int getIdealClass() {
        return idealClass;
    }

    public void setIdealClass(int idealClass) {
        this.idealClass = idealClass;
    }
    
    
}