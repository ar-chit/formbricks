"use client";

import { customSurveyTemplate } from "@/app/lib/templates";
import { cn } from "@/lib/cn";
import { Button } from "@/modules/ui/components/button";
import { Project } from "@prisma/client";
import { useTranslate } from "@tolgee/react";
import { PlusCircleIcon } from "lucide-react";
import { TTemplate } from "@formbricks/types/templates";
import { replacePresetPlaceholders } from "../lib/utils";

interface StartFromScratchTemplateProps {
  activeTemplate: TTemplate | null;
  setActiveTemplate: (template: TTemplate) => void;
  onTemplateClick: (template: TTemplate) => void;
  project: Project;
  createSurvey: (template: TTemplate) => void;
  loading: boolean;
  noPreview?: boolean;
}

export const StartFromScratchTemplate = ({
  activeTemplate,
  setActiveTemplate,
  onTemplateClick,
  project,
  createSurvey,
  loading,
  noPreview,
}: StartFromScratchTemplateProps) => {
  const { t } = useTranslate();
  const customSurvey = customSurveyTemplate(t);
  const showCreateSurveyButton = activeTemplate?.name === customSurvey.name;

  const handleCardClick = () => {
    if (noPreview) {
      createSurvey(customSurvey);
      return;
    }
    const newTemplate = replacePresetPlaceholders(customSurvey, project);
    onTemplateClick(newTemplate);
    setActiveTemplate(newTemplate);
  };

  const cardClass = cn(
    showCreateSurveyButton
      ? "ring-brand-dark border-transparent ring-2"
      : "hover:border-brand-dark border-dashed border-slate-300",
    "flex flex-col group relative rounded-lg border-2 bg-transparent p-6 transition-colors duration-120 duration-150"
  );

  const cardContent = (
    <>
      <PlusCircleIcon className="text-brand-dark h-8 w-8 transition-all duration-150 group-hover:scale-110" />
      <h3 className="text-md mb-1 mt-3 text-left font-bold text-slate-700">{customSurvey.name}</h3>
      <p className="text-left text-xs text-slate-600">{customSurvey.description}</p>
      {showCreateSurveyButton && (
        <div className="text-left">
          <Button
            className="mt-6 px-6 py-3"
            disabled={activeTemplate === null}
            loading={loading}
            onClick={() => createSurvey(activeTemplate)}>
            {t("common.create_survey")}
          </Button>
        </div>
      )}
    </>
  );

  if (!showCreateSurveyButton) {
    return (
      <button type="button" className={cardClass} onClick={handleCardClick}>
        {cardContent}
      </button>
    );
  }

  return <div className={cardClass}>{cardContent}</div>;
};
