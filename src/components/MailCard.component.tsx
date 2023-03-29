import { faker } from "@faker-js/faker";
import { Avatar, Button, Card, Row, Typography } from "antd";
import dayjs from "dayjs";
import { useAppActions, useAppSelector } from "hooks/useApp";
import React, { useEffect, useMemo } from "react";
import { useUpdateMailMutation } from "store/api/mail.api";

const MailCard: React.FC = () => {
  const { currentMail } = useAppSelector((store) => store.client);
  const { setCurrentMail } = useAppActions();
  const avatarUrl = useMemo(() => faker.image.avatar(), []);
  const [updateMail] = useUpdateMailMutation();

  const readMail = (id: number) => updateMail({ id, mail: { isRead: true } });

  useEffect(() => {
    if (!currentMail || currentMail.isRead) return;
    readMail(currentMail.id);
  }, [currentMail]);

  if (!currentMail) return null;
  return (
    <div className="content_wrapper mail_card__container">
      <Row className="mails_controls">
        <Button onClick={() => setCurrentMail(undefined)}>Назад</Button>
      </Row>
      <Card>
        <Card.Meta
          avatar={<Avatar size={48} src={avatarUrl} />}
          title={currentMail.title}
          description={
            <Row justify="space-between">
              <span>{currentMail.from}</span>
              <span>{dayjs(currentMail.date).format("DD.MM.YYYY HH:mm")}</span>
            </Row>
          }
        />
        <Typography.Paragraph style={{ marginTop: 14 }}>
          {currentMail.text}
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default MailCard;
