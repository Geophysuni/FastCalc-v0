// components/Forms/AddOperationTemplateForm.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  // Grid,
} from "@mui/material";
import Grid from '@mui/material/Grid';



interface AddOperationTemplateFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    duration: string;
    wellType: string;
    effectDuration: string;
    changes: {
      productionIncrease: number;
      watercutReduction: number;
    };
  }) => void;
}

const AddOperationTemplateForm: React.FC<AddOperationTemplateFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    wellType: "",
    effectDuration: "",
    productionIncrease: "",
    watercutReduction: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({
      name: formData.name,
      duration: formData.duration,
      wellType: formData.wellType,
      effectDuration: formData.effectDuration,
      changes: {
        productionIncrease: Number(formData.productionIncrease),
        watercutReduction: Number(formData.watercutReduction),
      },
    });
    onClose();
    setFormData({
      name: "",
      duration: "",
      wellType: "",
      effectDuration: "",
      productionIncrease: "",
      watercutReduction: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить ГТМ</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1} component="div">
          <Grid component="div">
            <TextField label="Название" name="name" fullWidth onChange={handleChange} value={formData.name} />
          </Grid>
          <Grid component="div">
            <TextField label="Длительность" name="duration" fullWidth onChange={handleChange} value={formData.duration} />
          </Grid>
          <Grid>
            <TextField label="Тип скважин" name="wellType" fullWidth onChange={handleChange} value={formData.wellType} />
          </Grid>
          <Grid >
            <TextField label="Увеличение добычи (%)" name="productionIncrease" type="number" fullWidth onChange={handleChange} value={formData.productionIncrease} />
          </Grid>
          <Grid >
            <TextField label="Снижение обводненности (%)" name="watercutReduction" type="number" fullWidth onChange={handleChange} value={formData.watercutReduction} />
          </Grid>
          <Grid >
            <TextField label="Длительность эффекта" name="effectDuration" fullWidth onChange={handleChange} value={formData.effectDuration} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOperationTemplateForm;
