package com.example.Web3.view;

import com.example.Web3.model.EntityDataAccessObject;
import com.example.Web3.model.PointResult;
import com.example.Web3.model.PointResultDataAccessObject;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.util.ArrayList;
import java.util.List;

@ManagedBean
@ApplicationScoped
public class TableView {
    private EntityDataAccessObject<Long, PointResult> pointResultEntityDataAccessObject = new PointResultDataAccessObject();

    public List<PointResult> getPointResultList() {
        List<PointResult> pointResultListFromDataBase = new ArrayList<>();
        pointResultListFromDataBase = pointResultEntityDataAccessObject.getAll();
        return pointResultListFromDataBase;
    }

    public void clearTable() {
        pointResultEntityDataAccessObject.deleteAll();
    }
}
