export interface ToolContent {
  slug: string;
  intro: string;
  howItWorks: string;
  interpretationGuide: string;
  faqs: Array<{ question: string; answer: string }>;
}

export async function getContent(contentFile: string): Promise<ToolContent | null> {
  try {
    const mod = await import(`./${contentFile}`);
    return mod.default as ToolContent;
  } catch {
    return null;
  }
}
