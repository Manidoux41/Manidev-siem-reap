import Image from "next/image";
import { getMessages, type SiteLocale } from "@/lib/i18n";
import { aiToolsContent } from "@/lib/ai-tools";

export function AiTools({ locale }: { locale: SiteLocale }) {
  const content = aiToolsContent[locale];
  return (
    <section className="ai-tools" aria-labelledby="ai-tools-title">
      <header>
        <h2 id="ai-tools-title">{content.title}</h2>
        <p>{content.intro}</p>
      </header>
      <div className="ai-tools-comparison">
        <table className="ai-tools-table" aria-labelledby="ai-tools-title">
          <thead>
            <tr>
              <th scope="col">{getMessages(locale).about.aiLabel}</th>
              <th scope="col">{content.capabilitiesLabel}</th>
              <th scope="col">{content.usageLabel}</th>
            </tr>
          </thead>
          <tbody>
            {content.tools.map((tool, index) => (
              <tr key={tool.id} className={`ai-tool ai-tool-${tool.id}`}>
                <th scope="row">
                  <div className="ai-tool-heading">
                    <span className="ai-tool-logo">
                      <Image src={`/images/ai/${tool.id}.svg`} width={40} height={40} alt="" />
                    </span>
                    <div>
                      <span className="ai-tool-index" aria-hidden="true">0{index + 1}</span>
                      <h3>{tool.name}</h3>
                    </div>
                  </div>
                </th>
                <td>
                  <span className="ai-tool-mobile-label" aria-hidden="true">{content.capabilitiesLabel}</span>
                  <p>{tool.capabilities}</p>
                </td>
                <td className="ai-tool-usage">
                  <span className="ai-tool-mobile-label" aria-hidden="true">{content.usageLabel}</span>
                  <p>{tool.usage}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="ai-tools-safeguards">{content.safeguards}</p>
      <p className="ai-tools-disclaimer">{content.disclaimer}</p>
    </section>
  );
}
