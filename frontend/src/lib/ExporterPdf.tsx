import * as React from "react";
import { useReactToPrint } from "react-to-print";

interface PrintContentRef {
  current: HTMLElement | null;
}

interface PropsType {
  page: React.ReactNode;
}

export const ExporterPDF = ({ page }: PropsType) => {
  const componentRef: any = React.useRef<PrintContentRef>(null);

  const onBeforeGetContentResolve = React.useRef<(() => void) | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  return (
    <div>
      {loading ? (
        <p className="indicator inline-block rounded text-blue-600  py-2 text-xs font-medium hover:text-blue-700  duration-150">
          Loading...
        </p>
      ) : (
        <button
          onClick={handlePrint}
          className="inline-block rounded text-blue-600  py-2 text-xs font-medium hover:text-blue-700  duration-150">
          Print
        </button>
      )}

      <div ref={componentRef} className="print-hidden">
        {page}
      </div>
    </div>
  );
};
