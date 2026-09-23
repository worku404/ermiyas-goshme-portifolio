import { redirect } from "next/navigation";

/**
 * Root landing page (/).
 *
 * In static exports (output: 'export'), middleware cannot run dynamically.
 * Calling redirect('/en/') emits an HTML page with meta refresh
 * (<meta http-equiv="refresh" content="0; url=/en/">) directing visitors
 * to the default locale immediately.
 */
export default function RootPage() {
  redirect("/en/");
}
