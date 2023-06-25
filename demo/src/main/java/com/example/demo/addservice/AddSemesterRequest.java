package com.example.demo.addservice;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AddSemesterRequest {
    private Date startDate;
    private Date endDate;
    private String semesterName;
}
