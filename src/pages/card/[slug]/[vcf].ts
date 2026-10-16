import type { APIRoute, GetStaticPaths } from 'astro';
import { cards, toVCard, type CardProfile } from '../../../data/cards';

/** Static vCard file for each business card, e.g. /card/<slug>/Tony-Luna-Woodfox-Coffee.vcf */
export const getStaticPaths: GetStaticPaths = () =>
  cards.map((card) => ({ params: { slug: card.slug, vcf: card.vcfName }, props: { card } }));

export const GET: APIRoute = ({ props }) => {
  const card = (props as { card: CardProfile }).card;
  return new Response(toVCard(card), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${card.vcfName}"`,
    },
  });
};
