import express from 'express';
import {
  holeAlleAuftraege,
  getAuftragById,
  createAuftrag,
  updateAuftrag,
  deleteAuftrag,
} from '../Services/auftragService';

const router = express.Router();

// GET /auftraege
router.get('/', (req, res) => {
  const result = holeAlleAuftraege();
  res.json(result);
});

// GET /auftraege/:id
router.get('/:id', (req, res) => {
  const auftrag = getAuftragById(req.params.id);
  if (auftrag) {
    res.json(auftrag);
  } else {
    res.status(404).json({ error: 'Auftrag nicht gefunden' });
  }
});

// POST /auftraege
router.post('/', (req, res) => {
  const neuerAuftrag = createAuftrag(req.body);
  res.status(201).json(neuerAuftrag);
});

// PUT /auftraege/:id
router.put('/:id', (req, res) => {
  const aktualisiert = updateAuftrag(req.params.id, req.body);
  if (aktualisiert) {
    res.json(aktualisiert);
  } else {
    res.status(404).json({ error: 'Auftrag nicht gefunden' });
  }
});

// DELETE /auftraege/:id
router.delete('/:id', (req, res) => {
  const success = deleteAuftrag(req.params.id);
  if (success) {
    res.json({ message: 'Auftrag gelöscht' });
  } else {
    res.status(404).json({ error: 'Auftrag nicht gefunden' });
  }
});

export default router;