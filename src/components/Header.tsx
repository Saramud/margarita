import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps { } // пока пропсов нет, но можно расширять

export default function Header(props: HeaderProps) {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <nav className="space-x-4">
                <Link href="/">{`Home`}</Link>
                <Link href="/design">{`Design`}</Link>
                <Link href="/photography">{`Photography`}</Link>
                <Link href="/clients">{`Clients`}</Link>
                <Link href="/pricing">{`Pricing`}</Link>
                <Link href="/contacts">{`Contacts`}</Link>
                <Link href="/catalog">{`Catalog`}</Link>
            </nav>
            <LanguageSwitcher />
        </header>
    );
}
