import { Tag } from "primereact/tag";

export type difficultyType = "insane" | "hard" | "medium" | "easy";

interface IDifficultyTemplateProps {
  difficulty: difficultyType;
}

export default function DifficultyTemplate({ difficulty }: IDifficultyTemplateProps) {
  function getDifficultySeverity(diff: difficultyType) {
    switch (diff) {
      case "insane":
        return "danger";
      case "medium":
        return "warning";
      case "easy":
        return "success";
      default:
    }
    return null;
  }

  return <Tag value={difficulty} severity={getDifficultySeverity(difficulty)} />;
}
