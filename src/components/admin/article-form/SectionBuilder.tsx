"use client";

import { ChevronDown, ChevronUp, ImageIcon, Plus, Trash2 } from "lucide-react";
import {
  AdminButton,
  AdminField,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/AdminShell";
import type { NewsContentSection } from "@/lib/content/news";
import { slugify } from "@/lib/admin/defaults";
import {
  getRecommendedImageSectionIndexes,
  getRecommendedSectionImageCount,
  countSectionImages,
  countSectionImagesUploaded,
} from "@/lib/admin/article-images";
import { ArticleImageUpload } from "@/components/admin/article-form/ArticleImageUpload";

type SectionBuilderProps = {
  sections: NewsContentSection[];
  articleSlug: string;
  primaryKeyword?: string;
  /** Ước tính số từ bài — để gợi ý số ảnh section */
  estimatedWordCount?: number;
  onChange: (sections: NewsContentSection[]) => void;
};

function emptySection(level: 2 | 3): NewsContentSection {
  return {
    id: "",
    heading: "",
    level,
    paragraphs: [""],
  };
}

export function SectionBuilder({
  sections,
  articleSlug,
  primaryKeyword = "",
  estimatedWordCount = 0,
  onChange,
}: SectionBuilderProps) {
  const recommendedImageCount = getRecommendedSectionImageCount(estimatedWordCount);
  const recommendedIndexes = getRecommendedImageSectionIndexes(
    sections,
    recommendedImageCount,
  );
  const configuredImages = countSectionImages(sections);
  const uploadedImages = countSectionImagesUploaded(sections);

  function applySuggestedImages() {
    const next = sections.map((section, index) => {
      if (!recommendedIndexes.includes(index) || section.level !== 2) {
        return section;
      }
      if (section.image) return section;
      return {
        ...section,
        image: {
          src: "",
          alt: primaryKeyword
            ? `${section.heading} — ${primaryKeyword}`
            : section.heading,
          caption: `Minh họa: ${section.heading}`,
        },
      };
    });
    onChange(next);
  }
  function updateSection(index: number, patch: Partial<NewsContentSection>) {
    const next = sections.map((s, i) => {
      if (i !== index) return s;
      const merged = { ...s, ...patch };
      if (patch.heading !== undefined && !s.id) {
        merged.id = slugify(patch.heading);
      }
      return merged;
    });
    onChange(next);
  }

  function moveSection(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function removeSection(index: number) {
    onChange(sections.filter((_, i) => i !== index));
  }

  function addSection(level: 2 | 3) {
    onChange([...sections, emptySection(level)]);
  }

  function updateParagraph(sectionIndex: number, pIndex: number, value: string) {
    const section = sections[sectionIndex];
    const paragraphs = [...section.paragraphs];
    paragraphs[pIndex] = value;
    updateSection(sectionIndex, { paragraphs });
  }

  function addParagraph(sectionIndex: number) {
    const section = sections[sectionIndex];
    updateSection(sectionIndex, {
      paragraphs: [...section.paragraphs, ""],
    });
  }

  function removeParagraph(sectionIndex: number, pIndex: number) {
    const section = sections[sectionIndex];
    updateSection(sectionIndex, {
      paragraphs: section.paragraphs.filter((_, i) => i !== pIndex),
    });
  }

  function toggleList(sectionIndex: number, enabled: boolean) {
    if (!enabled) {
      const section = sections[sectionIndex];
      const { list: _list, ...rest } = section;
      updateSection(sectionIndex, { ...rest, list: undefined });
      return;
    }
    updateSection(sectionIndex, {
      list: { ordered: false, items: [""] },
    });
  }

  function updateListItem(sectionIndex: number, itemIndex: number, value: string) {
    const section = sections[sectionIndex];
    if (!section.list) return;
    const items = [...section.list.items];
    items[itemIndex] = value;
    updateSection(sectionIndex, { list: { ...section.list, items } });
  }

  function addListItem(sectionIndex: number) {
    const section = sections[sectionIndex];
    if (!section.list) return;
    updateSection(sectionIndex, {
      list: { ...section.list, items: [...section.list.items, ""] },
    });
  }

  function toggleImage(sectionIndex: number, enabled: boolean) {
    if (!enabled) {
      const section = sections[sectionIndex];
      const { image: _img, ...rest } = section;
      updateSection(sectionIndex, { ...rest, image: undefined });
      return;
    }
    updateSection(sectionIndex, {
      image: { src: "", alt: "", caption: "" },
    });
  }

  return (
    <div className="space-y-4">
      <div
        className={`rounded-xl border p-4 text-sm ${
          uploadedImages >= recommendedImageCount
            ? "bg-green-50 border-green-200 text-green-900"
            : "bg-amber-50 border-amber-200 text-amber-950"
        }`}
      >
        <p className="font-semibold flex items-center gap-2">
          <ImageIcon className="w-4 h-4 shrink-0" />
          Ảnh minh họa theo đoạn nội dung
        </p>
        <p className="mt-1 text-[13px] leading-relaxed opacity-90">
          Bài ~{estimatedWordCount || "…"} từ → cần{" "}
          <strong>{recommendedImageCount} ảnh section</strong> (không tính ảnh
          đại diện). Đã bật {configuredImages}, đã upload {uploadedImages}.
          Gắn ảnh vào các H2 chính để người đọc dễ theo dõi từng phần.
        </p>
        {uploadedImages < recommendedImageCount && recommendedIndexes.length > 0 && (
          <AdminButton
            type="button"
            variant="secondary"
            className="mt-3"
            onClick={applySuggestedImages}
          >
            Bật khung ảnh tại {recommendedIndexes.length} H2 được gợi ý
          </AdminButton>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <AdminButton type="button" onClick={() => addSection(2)}>
          <Plus className="w-4 h-4 mr-1 inline" /> Thêm H2
        </AdminButton>
        <AdminButton type="button" variant="secondary" onClick={() => addSection(3)}>
          <Plus className="w-4 h-4 mr-1 inline" /> Thêm H3
        </AdminButton>
      </div>

      {sections.length === 0 && (
        <p className="text-sm text-slate-500 bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200">
          Chưa có section. Thêm H2 bối cảnh → H2 chi tiết (+ H3 con) → H2 chính
          sách/ưu đãi. Mỗi bài nên có 2–3 ảnh minh họa gắn vào các H2 chính.
        </p>
      )}

      {sections.map((section, index) => {
        const isImageRecommended =
          section.level === 2 && recommendedIndexes.includes(index);

        return (
        <div
          key={`${section.id}-${index}`}
          className={`bg-white rounded-2xl border p-5 space-y-4 ${
            isImageRecommended && !section.image?.src
              ? "border-amber-300 ring-1 ring-amber-100"
              : "border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                section.level === 2
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary-dark"
              }`}
            >
              H{section.level}
            </span>
            <div className="flex gap-1">
              <AdminButton
                type="button"
                variant="secondary"
                className="!px-2 !py-1"
                onClick={() => moveSection(index, -1)}
                disabled={index === 0}
              >
                <ChevronUp className="w-4 h-4" />
              </AdminButton>
              <AdminButton
                type="button"
                variant="secondary"
                className="!px-2 !py-1"
                onClick={() => moveSection(index, 1)}
                disabled={index === sections.length - 1}
              >
                <ChevronDown className="w-4 h-4" />
              </AdminButton>
              <AdminButton
                type="button"
                variant="danger"
                className="!px-2 !py-1"
                onClick={() => removeSection(index)}
              >
                <Trash2 className="w-4 h-4" />
              </AdminButton>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="Tiêu đề section">
              <input
                className={adminInputClass}
                value={section.heading}
                onChange={(e) =>
                  updateSection(index, {
                    heading: e.target.value,
                    id: slugify(e.target.value),
                  })
                }
              />
            </AdminField>
            <AdminField label="Anchor ID" hint="Dùng cho mục lục">
              <input
                className={adminInputClass}
                value={section.id}
                onChange={(e) =>
                  updateSection(index, { id: slugify(e.target.value) })
                }
              />
            </AdminField>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">Đoạn văn</p>
            {section.paragraphs.map((p, pIndex) => (
              <div key={pIndex} className="flex gap-2">
                <textarea
                  className={`${adminTextareaClass} flex-1`}
                  rows={2}
                  value={p}
                  placeholder="2–3 câu/đoạn — có thể dùng HTML"
                  onChange={(e) => updateParagraph(index, pIndex, e.target.value)}
                />
                <AdminButton
                  type="button"
                  variant="danger"
                  className="!px-2 shrink-0"
                  onClick={() => removeParagraph(index, pIndex)}
                  disabled={section.paragraphs.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </AdminButton>
              </div>
            ))}
            <AdminButton
              type="button"
              variant="secondary"
              onClick={() => addParagraph(index)}
            >
              + Thêm đoạn
            </AdminButton>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(section.list)}
                onChange={(e) => toggleList(index, e.target.checked)}
              />
              Có danh sách (ul/ol)
            </label>
            {section.list && (
              <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={section.list.ordered}
                    onChange={(e) =>
                      updateSection(index, {
                        list: { ...section.list!, ordered: e.target.checked },
                      })
                    }
                  />
                  Danh sách đánh số (ol)
                </label>
                {section.list.items.map((item, itemIndex) => (
                  <input
                    key={itemIndex}
                    className={adminInputClass}
                    value={item}
                    placeholder="Mục danh sách — HTML được phép"
                    onChange={(e) =>
                      updateListItem(index, itemIndex, e.target.value)
                    }
                  />
                ))}
                <AdminButton type="button" variant="secondary" onClick={() => addListItem(index)}>
                  + Mục list
                </AdminButton>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            {isImageRecommended && (
              <p className="text-xs font-medium text-amber-800 bg-amber-50 rounded-lg px-3 py-2">
                Gợi ý: thêm ảnh minh họa cho section H2 này
              </p>
            )}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(section.image)}
                onChange={(e) => toggleImage(index, e.target.checked)}
              />
              Có ảnh minh họa section
            </label>
            {section.image && (
              <div className="pl-4 border-l-2 border-slate-200">
                <ArticleImageUpload
                  articleSlug={articleSlug}
                  primaryKeyword={primaryKeyword}
                  alt={section.image.alt}
                  caption={section.image.caption}
                  currentSrc={section.image.src}
                  nameHint={section.id || `section-${index + 1}`}
                  altDescription={section.heading}
                  onAltChange={(alt) =>
                    updateSection(index, {
                      image: { ...section.image!, alt },
                    })
                  }
                  onCaptionChange={(caption) =>
                    updateSection(index, {
                      image: { ...section.image!, caption },
                    })
                  }
                  onUploaded={(src) =>
                    updateSection(index, {
                      image: { ...section.image!, src },
                    })
                  }
                  onManualUrlChange={(src) =>
                    updateSection(index, {
                      image: { ...section.image!, src },
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
        );
      })}
    </div>
  );
}
