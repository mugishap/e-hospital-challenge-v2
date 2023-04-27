package com.boaz.eHospital.user.servlets.pharmacist;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boaz.eHospital.database.PatientDB;
import com.boaz.eHospital.database.PharmacistDB;
import com.boaz.eHospital.user.models.Patient;
import com.boaz.eHospital.user.models.Pharmacist;
import com.boaz.eHospital.user.models.User;
import com.boaz.eHospital.utils.JwtUtil;
import com.boaz.eHospital.utils.ResFormat;
import com.boaz.eHospital.utils.ResponseEntity;

import io.jsonwebtoken.Claims;

@WebServlet("/pharmacist/getPatients")
public class GetPatients extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {

            String jwtToken = JwtUtil.extractToken(req);
            Claims claims = JwtUtil.parseJwtToken(jwtToken);

            String pharmacistPhone = claims.get("phone", String.class);
            Pharmacist pharmacist = PharmacistDB.findPharmacist(pharmacistPhone);

            if (pharmacist == null) {
                ResFormat.res(res, new ResponseEntity<>("401 Unauthorized", null), HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            Patient[] patients = PatientDB.getPharmacistPatientsWhoHaveConsultation(pharmacist.getPhone());

            ResFormat.res(res, new ResponseEntity<User[]>("your patients retrieved successfully", patients),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
