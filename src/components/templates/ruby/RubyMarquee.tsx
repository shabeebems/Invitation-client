"use client";

export default function RubyMarquee({
  saveLabel,
  dateLabel,
  placeLabel,
}: {
  saveLabel: string;
  dateLabel: string;
  placeLabel: string;
}) {
  const chunk = (
    <>
      {saveLabel}
      <b>✦</b>
      {dateLabel}
      <b>✦</b>
      {placeLabel}
      <b>✦</b>
    </>
  );

  return (
    <div className="rb-mq" aria-hidden="true">
      <div className="rb-mq-track rb-gv">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i}>{chunk}</span>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <span key={`d-${i}`}>{chunk}</span>
        ))}
      </div>
    </div>
  );
}
