// pages/OperationsPage.tsx
import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import OperationTemplateTile from "../components/Tiles/OperationTemplateTile";
import ActionButton from "../components/common/ActionButton";
import AddOperationTemplateForm from "../components/Forms/AddOperationTemplateForm";

const OperationsPage: React.FC = () => {
  const [templates, setTemplates] = useState([
    {
      name: "ГТМ - Кислотная обработка",
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

  const handleAddTemplate = (data: typeof templates[number]) => {
    setTemplates((prev) => [...prev, data]);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Шаблоны ГТМ
      </Typography>

      <ActionButton onClick={() => setFormOpen(true)} label="Добавить ГТМ" />

      <Stack spacing={2}>
        {templates.map((template, index) => (
          <OperationTemplateTile key={index} {...template} />
        ))}
      </Stack>

      <AddOperationTemplateForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddTemplate}
      />
    </Box>
  );
};

export default OperationsPage;
