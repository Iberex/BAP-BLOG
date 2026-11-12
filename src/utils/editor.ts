// Links to the TinaCMS editor (Netlify). The public blog (GitHub Pages) opens the
// editor in a new tab; inside the editor itself the links stay in the editor.
export const EDITOR = "https://bap-blog-editor.netlify.app";

// The editor version is built with base "/" (TINA_EDITOR=1), the public site with "/BAP-BLOG/".
export const inEditor = import.meta.env.BASE_URL === "/";

const admin = inEditor ? "/admin/index.html" : `${EDITOR}/admin/index.html`;

// "+ nieuwe post": opens an empty post in the editor.
export const nieuwePostUrl = `${admin}#/collections/new/post`;

// "Beheer": the editor, showing the blog.
export const beheerUrl = `${admin}#/~/posts/`;

// Posts made in TinaCMS live in src/content/blog/posts ("posts/<file>").
const tinaFile = (slug: string) =>
  slug.startsWith("posts/") ? slug.slice("posts/".length) : null;

// Link to a post. Inside the editor a TinaCMS post opens straight on its editable page.
export const postHref = (slug: string) => {
  const file = tinaFile(slug);
  return inEditor && file
    ? `/bewerk/${file}`
    : `${import.meta.env.BASE_URL}posts/${slug}/`;
};

// "bewerk deze post" on the public site, for TinaCMS posts only.
export const bewerkUrl = (slug: string) => {
  const file = tinaFile(slug);
  return file ? `${EDITOR}/admin/index.html#/~/bewerk/${file}` : null;
};
