package com.andy.andy_demo.controllers;

import com.andy.andy_demo.domain.Printer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.andy.andy_demo.services.PrinterService;
import java.util.List;

@Controller
@CrossOrigin(origins = "*")
public class PrinterController {
    private final PrinterService printerService;

    public PrinterController (PrinterService pService) {
        this.printerService = pService;
    }

    // create a new printer
    @PostMapping(path = "/printers")
    public ResponseEntity<Printer> createPrinter(@RequestBody Printer printer) {
        Printer getPrinter = this.printerService.getPrinterById(printer.getId());
        if (getPrinter == null) {
            final Printer savedPrinter = this.printerService.createUpdate(printer);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPrinter);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    // get all printers
    @GetMapping(path = "/all")
    public ResponseEntity<List<Printer>> getAllPrinters() {
        List<Printer> printers = this.printerService.getAllPrinters();
        return new ResponseEntity<>(printers, HttpStatus.OK);
    }

    // get specific printer by id
    @GetMapping("/printers/{id}")
    public ResponseEntity<Printer> getPrinterById(@PathVariable Integer id) {
        Printer printer = this.printerService.getPrinterById(id);
        if (printer != null) {
            return new ResponseEntity<>(printer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // updating an existing printer
    @PutMapping("/printers/{id}")
    public ResponseEntity<Printer> updatePrinter(@PathVariable Integer id, @RequestBody Printer newPrinter) {
        Printer getPrinter = this.printerService.getPrinterById(id);
        if (getPrinter != null) {
            this.printerService.deletePrinter(id);
            final Printer updatedPrinter = this.printerService.createUpdate(newPrinter);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedPrinter);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // delete a printer
    @DeleteMapping("/printers/{id}")
    public ResponseEntity<Printer> deletePrinter(@PathVariable Integer id) {
        Printer getPrinter = this.printerService.getPrinterById(id);
        if (getPrinter != null) {
            this.printerService.deletePrinter(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
