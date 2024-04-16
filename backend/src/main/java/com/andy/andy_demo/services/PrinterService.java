package com.andy.andy_demo.services;

import com.andy.andy_demo.domain.Printer;

import java.util.List;

public interface PrinterService {
    // create update printer in db
    Printer createUpdate(Printer printer);
    // get all printers from db
    List<Printer> getAllPrinters();
    // get specific printer from db
    Printer getPrinterById(Integer id);
    // delete specific printer from db
    void  deletePrinter (Integer id);
}
