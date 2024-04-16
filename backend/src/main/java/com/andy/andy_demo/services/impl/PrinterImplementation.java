package com.andy.andy_demo.services.impl;

import com.andy.andy_demo.domain.Printer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.andy.andy_demo.repositories.PrinterRepository;
import com.andy.andy_demo.services.PrinterService;

import java.util.List;
import java.util.Optional;

@Service
public class PrinterImplementation implements PrinterService {
    private final PrinterRepository printerRepository;

    @Autowired
    public PrinterImplementation (PrinterRepository pRepository) {
        this.printerRepository = pRepository;
    }

    @Override
    public Printer createUpdate(Printer printer) {
       return this.printerRepository.save(printer);
    }

    public void deletePrinter(Integer id) {
        this.printerRepository.deleteById(id);
    }

    public List<Printer> getAllPrinters() {
        return this.printerRepository.findAll();
    }

    public Printer getPrinterById(Integer id) {
        Optional<Printer> printerOptional = this.printerRepository.findById(id);
        return printerOptional.orElse(null);
    }

}
