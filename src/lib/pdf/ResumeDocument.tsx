import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import {
  career,
  education,
  links,
  profile,
  skills,
  summary,
  training,
} from "@/content/resume";

export function registerPdfFonts(fontBaseUrl: string) {
  Font.register({
    family: "Pretendard",
    fonts: [
      { src: `${fontBaseUrl}/fonts/Pretendard-Regular.ttf`, fontWeight: 400 },
      { src: `${fontBaseUrl}/fonts/Pretendard-Medium.ttf`, fontWeight: 500 },
      { src: `${fontBaseUrl}/fonts/Pretendard-SemiBold.ttf`, fontWeight: 600 },
      { src: `${fontBaseUrl}/fonts/Pretendard-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
}

const colors = {
  fg: "#101828",
  muted: "#6a7282",
  subtle: "#99a1af",
  border: "#e5e7eb",
  tagBg: "#fafafa",
  accent: "#4f46e5",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 9.5,
    lineHeight: 1.55,
    color: colors.fg,
    paddingVertical: 40,
    paddingHorizontal: 44,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatar: { width: 62, height: 62, borderRadius: 31 },
  name: { fontSize: 22, fontWeight: 700, lineHeight: 1.3 },
  role: { fontSize: 11, color: colors.accent, fontWeight: 500, marginTop: 6, lineHeight: 1.3 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 10, gap: 8 },
  contactItem: { fontSize: 9, color: colors.muted },
  section: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 16,
    paddingTop: 16,
  },
  sectionFirst: { marginTop: 20 },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 700,
    color: colors.accent,
    letterSpacing: 1.5,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  paragraph: { marginBottom: 6 },
  skillRow: { flexDirection: "row", marginBottom: 5 },
  skillLabel: { width: 90, fontSize: 9, fontWeight: 500, color: colors.muted },
  skillValue: { flex: 1, fontSize: 9 },
  itemBlock: { marginBottom: 14 },
  itemHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  itemTitle: { fontSize: 10.5, fontWeight: 600 },
  itemPeriod: { fontSize: 8.5, color: colors.muted },
  itemSub: { fontSize: 9, color: colors.muted, marginTop: 1 },
  itemDesc: { fontSize: 8.5, color: colors.subtle, marginTop: 2 },
  bulletRow: { flexDirection: "row", marginTop: 5 },
  bulletDot: { width: 8, fontSize: 9, color: colors.accent },
  bulletText: { flex: 1, fontSize: 9 },
  highlightBox: {
    backgroundColor: colors.tagBg,
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  highlightTitle: { fontSize: 9.5, fontWeight: 600 },
  linkRow: { flexDirection: "row", marginBottom: 4 },
  linkLabel: { width: 90, fontSize: 9, color: colors.muted },
  linkValue: { fontSize: 9 },
});

function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items.map((text, i) => (
        <View key={i} style={styles.bulletRow} wrap={false}>
          <Text style={styles.bulletDot}>·</Text>
          <Text style={styles.bulletText}>{text}</Text>
        </View>
      ))}
    </>
  );
}

export default function ResumeDocument({ imageBaseUrl }: { imageBaseUrl: string }) {
  return (
    <Document title={`${profile.name} 이력서`} author={profile.name}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerRow}>
          <Image src={`${imageBaseUrl}/images/profile.jpg`} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.role}>{profile.role}</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>{profile.email}</Text>
              <Text style={styles.contactItem}>{profile.githubHandle}</Text>
              <Text style={styles.contactItem}>{profile.blogHandle}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.sectionFirst]}>
          <Text style={styles.sectionTitle}>Summary</Text>
          {summary.map((p, i) => (
            <Text key={i} style={styles.paragraph}>
              {p}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.map((group) => (
            <View key={group.category} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{group.category}</Text>
              <Text style={styles.skillValue}>{group.items.join(" · ")}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career</Text>
          {career.map((item) => (
            <View key={item.company} style={styles.itemBlock} wrap>
              <View style={styles.itemHeaderRow}>
                <Text style={styles.itemTitle}>{item.company}</Text>
                <Text style={styles.itemPeriod}>
                  {item.period}
                  {item.periodDetail ? ` (${item.periodDetail})` : ""}
                </Text>
              </View>
              <Text style={styles.itemSub}>{item.role}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
              <Bullets items={item.bullets} />
              {item.highlight && (
                <View style={styles.highlightBox} wrap={false}>
                  <Text style={styles.highlightTitle}>{item.highlight.title}</Text>
                  <Bullets items={item.highlight.bullets} />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((item) => (
            <View key={item.school} style={styles.itemBlock} wrap={false}>
              <View style={styles.itemHeaderRow}>
                <Text style={styles.itemTitle}>{item.school}</Text>
                <Text style={styles.itemPeriod}>{item.period}</Text>
              </View>
              <Text style={styles.itemSub}>{item.major}</Text>
              <Text style={styles.itemDesc}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training</Text>
          {training.map((item) => (
            <View key={item.name} style={styles.itemBlock} wrap={false}>
              <View style={styles.itemHeaderRow}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemPeriod}>{item.period}</Text>
              </View>
              <Text style={styles.itemDesc}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Links</Text>
          {links.map((link) => (
            <View key={link.url} style={styles.linkRow}>
              <Text style={styles.linkLabel}>{link.label}</Text>
              <Text style={styles.linkValue}>{link.value}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
