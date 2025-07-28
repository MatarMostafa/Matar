import { Request, Response, NextFunction } from 'express';
import * as auftragService from '../Services/auftragService';

export const getAllAuftraege = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auftraege = auftragService.getAllAuftraege();
    res.json(auftraege);
  } catch (err) {
    next(err);
  }
};

export const getAuftragById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auftrag = auftragService.getAuftragById(req.params.id);
    if (auftrag) {
      res.json(auftrag);
    } else {
      res.status(404).json({ message: 'Auftrag nicht gefunden' });
    }
  } catch (err) {
    next(err);
  }
};

export const createAuftrag = (req: Request, res: Response, next: NextFunction) => {
  try {
    const newAuftrag = auftragService.createAuftrag(req.body);
    res.status(201).json(newAuftrag);
  } catch (err) {
    next(err);
  }
};

export const updateAuftrag = (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = auftragService.updateAuftrag(req.params.id, req.body);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Auftrag nicht gefunden' });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteAuftrag = (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = auftragService.deleteAuftrag(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Auftrag nicht gefunden' });
    }
  } catch (err) {
    next(err);
  }
};