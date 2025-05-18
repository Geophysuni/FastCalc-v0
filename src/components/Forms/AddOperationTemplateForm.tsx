import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

interface AddOperationTemplateFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  isEditing: boolean;
}

const AddOperationTemplateForm: React.FC<AddOperationTemplateFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    wellType: "",
    effectDuration: "",
    changes: {
      productionIncrease: 0,
      watercutReduction: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        price: "",
        duration: "",
        wellType: "",
        effectDuration: "",
        changes: {
          productionIncrease: 0,
          watercutReduction: 0,
        },
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("changes.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        changes: {
          ...prev.changes,
          [field]: Number(value),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditing ? "Редактировать шаблон ГТМ" : "Добавить новый шаблон ГТМ"}
      </DialogTitle>
      <DialogContent sx={{ maxHeight: "500px", overflowY: "auto", pt: 10 }}>
        <Stack spacing={2} mt={2}>
          <TextField
            name="name"
            label="Название ГТМ"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="price"
            label="Стоимость"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="duration"
            label="Длительность"
            value={formData.duration}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="wellType"
            label="Тип скважин"
            value={formData.wellType}
            onChange={handleChange}
            select
            fullWidth
            required
          >
            <MenuItem value="Нефтяные">Нефтяные</MenuItem>
            <MenuItem value="Газовые">Газовые</MenuItem>
            <MenuItem value="Нагнетательные">Нагнетательные</MenuItem>
          </TextField>
          <TextField
            name="effectDuration"
            label="Срок действия эффекта"
            value={formData.effectDuration}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="changes.productionIncrease"
            label="Прирост добычи (%)"
            type="number"
            value={formData.changes.productionIncrease}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 0 }}
          />
          <TextField
            name="changes.watercutReduction"
            label="Снижение обводненности (%)"
            type="number"
            value={formData.changes.watercutReduction}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 0 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Отмена
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? "Сохранить изменения" : "Добавить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOperationTemplateForm;
