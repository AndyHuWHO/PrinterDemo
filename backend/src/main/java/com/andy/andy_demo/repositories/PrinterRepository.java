package com.andy.andy_demo.repositories;

import com.andy.andy_demo.domain.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PrinterRepository extends JpaRepository<Printer, Integer> {
}
