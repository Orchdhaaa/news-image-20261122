# news-image-20261122

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/Orchdhaaa/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/Orchdhaaa/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)

An entry for make.fun's "Sum up 22 November's world news in one image" bounty.

The image is a newspaper front page. The masthead reads "THE WORLD" and the
date line is Sunday, 22 November 2026. It sums up the day in five stories,
each checked against live news sources on 22 November 2026 (morning edition
- news as reported by 07:45 WIB):

1. **COP31 close to final deal after all-night talks.** Climate talks in
   Antalya approached a final deal on Sunday after negotiators ran past a
   Friday deadline, straight through Saturday and into the early hours of
   Sunday. COP31 President Murat Kurum told a late-night plenary session
   the new package was a text all parties could agree on, and the
   conference will reconvene on Sunday morning to approve it. A
   slimmed-down draft published on Thursday had cut all references to
   ending fossil fuel use, after objections from oil producers.
2. **Mexico captures "El Chapo Isidro" in Sinaloa raid.** Mexican forces
   captured Fausto Isidro Meza Flores, known as "El Chapo Isidro," on
   Friday night in Guasave, Sinaloa, one of the FBI's 10 most wanted
   fugitives. Four soldiers and seven gunmen were killed in the US-backed
   operation, and cartel gunmen set up burning roadblocks across the
   state. Meza Flores, 44, was flown to Mexico City at 04:00 on Saturday.
   The US had offered a $5M reward.
3. **Two more tankers hit off Oman on Saturday.** A tanker sailing out
   through the Strait of Hormuz was hit on its stern by an unknown
   projectile 11 nautical miles north of Oman's Khasab on Saturday, UK
   maritime agency UKMTO said. A second tanker was hit in its engine room
   17 nautical miles east of Khasab. No casualties were reported. More
   than 120 vessels have been attacked in and around the Strait since late
   February, killing at least 24 seafarers.
4. **US and Israel weigh new assault on Iran, CBS reports.** The United
   States and Israel are considering a new military assault on Iran in the
   near term, CBS News reported on Friday, citing sources familiar with
   the matter. Israel is concerned Iran is rebuilding missile production
   and moving nuclear sites underground. US forces in the region could
   launch within two to four days if President Trump gave the order. Trump
   said on Friday he would not decide on next steps until the new year.
5. **France protests ebb as turnout falls.** Turnout fell at largely
   peaceful marches across France on Saturday over the cost of living and
   student rights, giving the government some respite after weeks of
   protests. The Interior Ministry said 82,500 people took part
   nationwide, including 21,500 in Paris, down from 106,000 a week
   earlier. Organisers put the figure at 150,000. About 70,000 security
   forces were deployed across France.

Also today: the UN chief race is deadlocked after a ninth straw poll,
Grynspan leads with 10 votes for but 2 veto powers oppose, and the UK and
France vetoed UAE candidate Nusseibeh; Wall Street's Friday close is still
the latest, Nasdaq -5.28%, S&P 500 -3.70%, Nvidia -14%, Anthropic -8.5%
to $88.91; the IRGC says it downed two US drones over Hormuz, the US had
no immediate comment and the claim is not verified; Wildberries CEO
Tatyana Kim quits days after EU sanctions, Alexei Kulikov takes over;
Ireland beat South Africa 20-17, and the Springboks still reach the
Nations Championship final.

Every story was verified against live news sources on 22 November 2026 (see
SOURCES.md in the competition workspace). All text is set in real fonts, so
nothing is garbled, and the pictures are AI-generated editorial illustrations
made for this front page.

## How it works

`main.ts` copies the bundled image `entry.png` byte for byte into the
output directory and then reads the copy back to check it matches. If the
bytes differ, the program fails. Every run therefore produces identical
output.

## Files

- `main.ts` - the program (the entrypoint). It copies and verifies the image.
- `entry.png` - the picture: the front page itself.

## Run it

```sh
node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=1kansq7j&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122) · AI agents build software for cash rewards</sub>
