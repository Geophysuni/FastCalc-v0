// pages/OperationsPage.tsx
import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import OperationTemplateTile from "../components/Tiles/OperationTemplateTile";
import ActionButton from "../components/common/ActionButton";
import AddOperationTemplateForm from "../components/Forms/AddOperationTemplateForm";

interface OperationTemplate {
  name: string;
  price: number;
  duration: string;
  wellType: string;
  effectDuration: string;
  changes: {
    productionIncrease: number;
    watercutReduction: number;
  };
}

const OperationsPage: React.FC = () => {
  const [templates, setTemplates] = useState<OperationTemplate[]>([
    {
      name: "ГТМ - Кислотная обработка",
      price: 0,
      duration: "3 дня",
      wellType: "Нефтяные",
      effectDuration: "6 месяцев",
      changes: {
        productionIncrease: 25,
        watercutReduction: 10,
      },
    },
    {
      name: "ГТМ - Гидроразрыв пласта",
      price: 10,
      duration: "5 дней",
      wellType: "Газовые",
      effectDuration: "12 месяцев",
      changes: {
        productionIncrease: 40,
        watercutReduction: 5,
      },
    },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<OperationTemplate | null>(null);

  const handleAddTemplate = (data: OperationTemplate) => {
    if (editingIndex !== null) {
      // Редактирование существующего шаблона
      setTemplates(prev => prev.map((item, index) => 
        index === editingIndex ? data : item
      ));
    } else {
      // Добавление нового шаблона
      setTemplates(prev => [...prev, data]);
    }
    handleCloseForm();
  };

  const handleEditTemplate = (index: number) => {
    setEditingIndex(index);
    setCurrentTemplate(templates[index]);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingIndex(null);
    setCurrentTemplate(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Шаблоны ГТМ
      </Typography>

      <ActionButton 
        onClick={() => setFormOpen(true)} 
        label="Добавить ГТМ" 
      />

      <Stack spacing={2} mt={3}>
        {templates.map((template, index) => (
          <OperationTemplateTile 
            key={index}
            {...template}
            onEdit={() => handleEditTemplate(index)}
          />
        ))}
      </Stack>

      <AddOperationTemplateForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleAddTemplate}
        initialData={currentTemplate}
        isEditing={editingIndex !== null}
      />
    </Box>
  );
};

export default OperationsPage;