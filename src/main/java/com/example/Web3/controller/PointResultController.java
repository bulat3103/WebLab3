package com.example.Web3.controller;

import com.example.Web3.model.PointResult;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class PointResultController {

    private static final List<Integer> yValues = Arrays.asList(-3, -2, -1, 0, 1, 2, 3);

    public PointResult createPointResult(String x, String y, String r) {
        double xValue = Double.parseDouble(x);
        int yValue = Integer.parseInt(y);
        double rValue = Double.parseDouble(r);
        boolean valid = validate(xValue, yValue, rValue);
        boolean hit = valid && checkHit(xValue, yValue, rValue);
        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        return new PointResult(xValue, yValue, rValue, time, valid, hit);
    }

    private boolean validate(double x, int y, double r) {
        return validateX(x) && validateR(r);
    }

    private boolean validateX(double x) {
        return x >= -5 && x <= 3;
    }

    private boolean validateR(double r) {
        return r >= 2 && r <= 5;
    }

    private boolean checkHit(double xValue, int yValue, double rValue) {
        return checkTriangle(xValue, yValue, rValue) || checkRectangle(xValue, yValue, rValue) || checkCircle(xValue, yValue, rValue);
    }

    private boolean checkTriangle(double xValue, int yValue, double rValue) {
        return xValue >= 0 && yValue <= 0 && yValue <= xValue / 2 - rValue / 2;
    }

    private boolean checkCircle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue >= 0 && Math.sqrt(xValue * xValue + yValue * yValue) <= rValue;
    }

    private boolean checkRectangle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && xValue >= -rValue && yValue <= 0 && yValue >= -rValue;
    }
}
