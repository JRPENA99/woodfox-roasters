import type { APIRoute, GetStaticPaths } from 'astro';
import { eventCards, eventVCard, resolveProfile, type EventCard } from '../../../data/eventCards';

/** /card/event-<id>/Woodfox-Coffee.vcf */
export const getStaticPaths: GetStaticPaths = () =>
  eventCards.map((card) => ({ params: { n: card.id, vcf: resolveProfile(card).vcfName }, props: { card } }));

export const GET: APIRoute = ({ props }) => {
  const card = (props as { card: EventCard }).card;
  return new Response(eventVCard(card), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${resolveProfile(card).vcfName}"`,
    },
  });
};
