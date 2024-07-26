export default function ChatInput({ cls }: { cls: string }) {
    return (<div className={`relative textarea textarea-bordered w-full ${cls}`} contentEditable />);
}