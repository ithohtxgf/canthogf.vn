/** Hỏi đáp kiểu co-ev (.p-faq): thẻ details mở sẵn câu đầu, không cần JavaScript. */
import { VINFAST_CAN_THO_FAQ } from "@/lib/content/vinfast-can-tho";

export function VinfastFaq() {
  return (
    <div className="p-faq">
      {VINFAST_CAN_THO_FAQ.map((item, index) => (
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
