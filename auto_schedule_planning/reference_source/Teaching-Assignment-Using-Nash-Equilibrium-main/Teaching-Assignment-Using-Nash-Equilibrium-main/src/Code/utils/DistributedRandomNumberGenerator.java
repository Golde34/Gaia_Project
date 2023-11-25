/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.utils;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author tungd
 */
public class DistributedRandomNumberGenerator {
    private Map<Integer, Double> distribution;
    private double distSum;
    
    public static int getRandomNumber(int min, int max){
        return (int) ((Math.random() * (max - min)) + min);
    }
    
    public double getDistSum(){
        return distSum;
    }

    public DistributedRandomNumberGenerator() {
        distribution = new HashMap<>();
    }
    
    public void addNumber(int value, double distribution){
        if (this.distribution.get(value) != null) {
            distSum -= this.distribution.get(value);
        }
        this.distribution.put(value, distribution);
        distSum += distribution;
    }
    
    public int getDistributedRandomNumber(){
        double rand = Math.random();
        double ratio = 1.0f / distSum;
        double tempDist = 0;
        for (Integer i : distribution.keySet()) {
            tempDist += distribution.get(i);
            if (rand / ratio <= tempDist) {
                return i;
            }
        }
        return 0;
    }
}
