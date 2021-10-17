package com.example.Web3;

import com.example.Web3.controller.PointResultController;
import com.example.Web3.model.EntityDataAccessObject;
import com.example.Web3.model.PointResult;
import com.example.Web3.model.PointResultDataAccessObject;
import org.primefaces.event.SlideEndEvent;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name = "pointsBean", eager = true)
@ApplicationScoped
public class PointsBean {
    private final PointResultController pointResultController = new PointResultController();
    private List<PointResult> pointResultList;
    private EntityDataAccessObject<Long, PointResult> dbManager = new PointResultDataAccessObject();

    private String x;
    private boolean ySelect1;
    private boolean ySelect2;
    private boolean ySelect3;
    private boolean ySelect4;
    private boolean ySelect5;
    private boolean ySelect6;
    private boolean ySelect7;
    private String r;

    public PointsBean() {
    }

    public void addResultToDB() {
        List<String> yValues = getYValues();
        for (String y : yValues) {
            PointResult pointResult = pointResultController.createPointResult(x, y, r);
            dbManager.insert(pointResult);
            pointResultList.add(pointResult);
        }
    }

    public void clearTable() {
        dbManager.deleteAll();
        pointResultList = new ArrayList<>();
    }

    private List<String> getYValues() {
        return new ArrayList<String>() {
            {
                if (ySelect1) add("-3");
                if (ySelect2) add("-2");
                if (ySelect3) add("-1");
                if (ySelect4) add("0");
                if (ySelect5) add("1");
                if (ySelect6) add("2");
                if (ySelect7) add("3");
            }
        };
    }

    public EntityDataAccessObject<Long, PointResult> getDbManager() {
        return dbManager;
    }

    public void setDbManager(EntityDataAccessObject<Long, PointResult> dbManager) {
        this.dbManager = dbManager;
    }

    public List<PointResult> getPointResultList() {
        if (pointResultList == null) {
            pointResultList = dbManager.getAll();
        }
        return pointResultList;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public boolean isySelect1() {
        return ySelect1;
    }

    public void setySelect1(boolean ySelect1) {
        this.ySelect1 = ySelect1;
    }

    public boolean isySelect2() {
        return ySelect2;
    }

    public void setySelect2(boolean ySelect2) {
        this.ySelect2 = ySelect2;
    }

    public boolean isySelect3() {
        return ySelect3;
    }

    public void setySelect3(boolean ySelect3) {
        this.ySelect3 = ySelect3;
    }

    public boolean isySelect4() {
        return ySelect4;
    }

    public void setySelect4(boolean ySelect4) {
        this.ySelect4 = ySelect4;
    }

    public boolean isySelect5() {
        return ySelect5;
    }

    public void setySelect5(boolean ySelect5) {
        this.ySelect5 = ySelect5;
    }

    public boolean isySelect6() {
        return ySelect6;
    }

    public void setySelect6(boolean ySelect6) {
        this.ySelect6 = ySelect6;
    }

    public boolean isySelect7() {
        return ySelect7;
    }

    public void setySelect7(boolean ySelect7) {
        this.ySelect7 = ySelect7;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }

    public void onSlideEnd(SlideEndEvent event) {
        r = String.valueOf(event.getValue());
    }
}
