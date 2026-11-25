/** Hỏi đáp kiểu co-ev (.p-faq): thẻ details mở sẵn câu đầu, không cần JavaScript. */
import { THUE_MUA_FAQ } from "@/lib/content/thue-mua-vinfast-page";

export function ThueMuaFaq() {
  return (
    <div className="p-faq">
      {THUE_MUA_FAQ.map((item, index) => (
        <details key={item.question} open={index === 0}>
          <summary>
            <span className="p-faq-n">{String(index + 1).padStart(2, "0")}</span>
            <span>{item.question}</span>
            <i aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
