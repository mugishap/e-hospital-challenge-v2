package com.boaz.eHospital.user.servlets;

import java.io.IOException;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boaz.eHospital.user.models.Patient;
import com.boaz.eHospital.user.models.Pharmacist;
import com.boaz.eHospital.user.models.Physician;
import com.boaz.eHospital.user.models.User;
import com.boaz.eHospital.utils.JSONUtil;
import com.boaz.eHospital.utils.RequestUtil;
import com.boaz.eHospital.utils.ResFormat;
import com.boaz.eHospital.utils.ResponseEntity;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestUtil.getBody(req);
            User user = null;
            String identifier = null;

            if (requestBody.contains("\"username\":")) {
                identifier = RequestUtil.getKeyFromJson(requestBody, "username");
                user = new JSONUtil().fromJson(requestBody, Patient.class);
            } else if (requestBody.contains("\"email\":")) {
                identifier = RequestUtil.getKeyFromJson(requestBody, "email");
                user = new JSONUtil().fromJson(requestBody, Physician.class);
            } else if (requestBody.contains("\"phone\":")) {
                identifier = RequestUtil.getKeyFromJson(requestBody, "phone");
                user = new JSONUtil().fromJson(requestBody, Pharmacist.class);
            } else {
                throw new IllegalArgumentException("Invalid user credentials - Missing ");
            }

            ResponseEntity<String> result = user.login(identifier, user.getPassword());
            ResFormat.res(res, result, HttpServletResponse.SC_OK);

        } catch (AuthenticationException e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_BAD_REQUEST);
        }
    }
}
