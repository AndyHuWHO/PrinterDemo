package com.andy.andy_demo.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name= "mock_printer")
public class Printer {
    @Id
    private Integer id;
    private Integer filament_total;
    private Integer filament_curr;
}
