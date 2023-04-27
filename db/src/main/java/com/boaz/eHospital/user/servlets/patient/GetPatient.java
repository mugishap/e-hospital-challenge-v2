package com.boaz.eHospital.user.servlets.patient;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boaz.eHospital.database.PatientDB;
import com.boaz.eHospital.user.models.Patient;
import com.boaz.eHospital.utils.JwtUtil;
import com.boaz.eHospital.utils.ResFormat;
import com.boaz.eHospital.utils.ResponseEntity;

import io.jsonwebtoken.Claims;

@WebServlet("/patient/get")
public class GetPatient extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtUtil.extractToken(req);
            Claims claims = JwtUtil.parseJwtToken(jwtToken);

            String username = claims.get("username", String.class);
            Patient patient = PatientDB.findPatient(username);

            if (patient == null) {
                throw new IllegalArgumentException("Patient not found", null);
            }

            ResFormat.res(res, new ResponseEntity<Patient>("patient retrieved successfully", patient),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_NOT_FOUND);
        }
    }
}
