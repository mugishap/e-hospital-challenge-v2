package com.boaz.eHospital.user.servlets.patient;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boaz.eHospital.database.PatientDB;
import com.boaz.eHospital.database.PhysicianDB;
import com.boaz.eHospital.user.models.Patient;
import com.boaz.eHospital.user.models.Physician;
import com.boaz.eHospital.utils.JwtUtil;
import com.boaz.eHospital.utils.RequestUtil;
import com.boaz.eHospital.utils.ResFormat;
import com.boaz.eHospital.utils.ResponseEntity;

import io.jsonwebtoken.Claims;

@WebServlet("/patient/choosePhysician")
public class SelectPhysician extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestUtil.getBody(req);
            String physicianEmail = RequestUtil.getKeyFromJson(requestBody, "physicianEmail");

            String jwtToken = JwtUtil.extractToken(req);
            Claims claims = JwtUtil.parseJwtToken(jwtToken);

            String username = claims.get("username", String.class);
            Patient patient = PatientDB.findPatient(username);

            Physician physicianExists = PhysicianDB.findPhysician(physicianEmail);

            if (physicianExists == null) {
                throw new IllegalArgumentException("Physician not found");
            }
            Patient result = PatientDB.selectPhysician(patient.getUsername(), physicianExists);
            ResFormat.res(res, new ResponseEntity<Patient>("selected physician successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}