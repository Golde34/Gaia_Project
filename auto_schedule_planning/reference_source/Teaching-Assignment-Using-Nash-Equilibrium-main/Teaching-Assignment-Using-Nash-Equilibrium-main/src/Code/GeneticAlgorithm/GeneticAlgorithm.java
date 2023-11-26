/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Code.GeneticAlgorithm;

import Code.utils.Data;
/**
 *
 * @author tungd
 */
public class GeneticAlgorithm {

    private Data data;
    private int numberPopulation;
    private int numberIteration;
    private int numberCrossOver;
    private int numberMutation;

    public GeneticAlgorithm(Data data, int numberPopulation, int numberIteration, int numberCrossOver, int numberMutation) {
        this.data = data;
        this.numberPopulation = numberPopulation;
        this.numberIteration = numberIteration;
        this.numberCrossOver = numberCrossOver;
        this.numberMutation = numberMutation;
    }

    public int getNumberPopulation() {
        return numberPopulation;
    }

    public void setNumberPopulation(int numberPopulation) {
        this.numberPopulation = numberPopulation;
    }

    public int getNumberIteration() {
        return numberIteration;
    }

    public void setNumberIteration(int numberIteration) {
        this.numberIteration = numberIteration;
    }

    public int getNumberCrossOver() {
        return numberCrossOver;
    }

    public void setNumberCrossOver(int numberCrossOver) {
        this.numberCrossOver = numberCrossOver;
    }

    public int getNumberMutation() {
        return numberMutation;
    }

    public void setNumberMutation(int numberMutation) {
        this.numberMutation = numberMutation;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }
}
